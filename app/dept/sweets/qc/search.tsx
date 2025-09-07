import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getAll } from '../../../../lib/db';
import { postBatch } from '../../../../lib/wp';

type Row = { id:number; batch_code:string; process_type:string; fields_json?:string; fields?:any; notes?:string };

export default function Search(){
  const params = useLocalSearchParams<{code?:string}>();
  const [code,setCode]=useState('');
  const [rows,setRows]=useState<Row[]>([]);

  const onSearch = async (q:string)=>{
    const like = `%${q}%`;
    const r = await getAll<Row>(
      'SELECT id,batch_code,process_type,fields_json,notes FROM batches WHERE batch_code LIKE ? ORDER BY id DESC',
      like
    );
    setRows(r.map(x=>({...x, fields: x.fields_json ? JSON.parse(x.fields_json) : undefined})));
  };

  useEffect(()=>{
    if(params?.code){
      const c = String(params.code);
      setCode(c);
      onSearch(c);
    }
  },[params?.code]);

  const syncToWP = async (row: Row) => {
    try{
      const parents = (await getAll<{code:string}>(
        `SELECT p.batch_code as code
           FROM batch_inputs bi
           JOIN batches p ON p.id = bi.parent_batch_id
          WHERE bi.child_batch_id = ?`,
        row.id
      )).map(x=>x.code);

      const payload = {
        batch_code: row.batch_code,
        process_type: row.process_type,
        fields: row.fields ?? (row.fields_json ? JSON.parse(row.fields_json) : {}),
        notes: row.notes || '',
        parent_batch_codes: parents
      };

      const r = await postBatch(payload);
      Alert.alert('Synced to WordPress', `ID: ${r.id || 'ok'}  Code: ${row.batch_code}`);
    }catch(e:any){
      Alert.alert('Sync failed', String(e.message||e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput style={styles.input} placeholder="Batch code…" value={code} onChangeText={(v)=>{ setCode(v); onSearch(v); }} />
      <FlatList
        data={rows}
        keyExtractor={(x)=>String(x.id)}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.code}>{item.batch_code}</Text>
            <Text style={styles.meta}>{item.process_type}</Text>
            <Pressable style={styles.btn} onPress={()=>syncToWP(item)}>
              <Text>Sync to WP</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#0c0c0c',padding:16},
  title:{color:'#f6c453',fontSize:20,fontWeight:'800',marginBottom:12},
  input:{backgroundColor:'#fff',padding:10,borderRadius:8,marginBottom:12},
  card:{backgroundColor:'#1a1a1a',padding:12,borderRadius:10,marginBottom:10},
  code:{color:'#fff',fontWeight:'800',fontSize:16},
  meta:{color:'#bbb',marginTop:2},
  btn:{marginTop:10,backgroundColor:'#f6c453',padding:10,borderRadius:8,alignItems:'center'}
});
