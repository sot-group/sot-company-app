import React, { useEffect, useMemo, useState } from 'react';
import { Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { run, getFirst, nowIso } from '../../../../lib/db';
import { PROCESS_FIELDS, PROCESS_LABEL, type ProcessKey, totalMillingMinutes } from '../../../../lib/processes';

export default function NewEntry(){
  const params = useLocalSearchParams<{type?:ProcessKey, parent?:string}>();
  const router = useRouter();
  const type = (params.type ?? 'arrival') as ProcessKey;

  const [batchCode,setBatchCode]=useState('');
  const [notes,setNotes]=useState('');
  const [parents,setParents]=useState('');
  const [fields,setFields]=useState<Record<string,string>>({});

  const defs = PROCESS_FIELDS[type];

  useEffect(()=>{
    const parent = params?.parent ? String(params.parent) : '';
    if(!parent) return;
    setParents(prev=>{
      const list = prev.split(',').map(s=>s.trim()).filter(Boolean);
      return list.includes(parent) ? prev : (prev ? `${prev},${parent}` : parent);
    });
  },[params?.parent]);

  const setField=(k:string,v:string)=> setFields(prev=>({...prev,[k]:v}));

  const computed = useMemo(()=>{
    const out:Record<string,any> = {};
    if(type==='choc_milling'){
      out.total_milling_min = totalMillingMinutes(fields.sessions||'');
    }
    return out;
  },[type,fields]);

  const save = async ()=>{
    try{
      if(!batchCode.trim()) throw new Error('Batch Code required');
      const t = nowIso();
      const payload = { ...fields, ...computed };

      await run(
        'INSERT INTO batches (batch_code,process_type,fields_json,notes,created_at,updated_at) VALUES (?,?,?,?,?,?)',
        batchCode.trim(), type, JSON.stringify(payload), notes, t, t
      );

      const row = await getFirst<{id:number}>('SELECT id FROM batches WHERE batch_code=?', batchCode.trim());
      if (row?.id) {
        const list = parents.split(',').map(s=>s.trim()).filter(Boolean);
        for (const code of list) {
          const p = await getFirst<{id:number}>('SELECT id FROM batches WHERE batch_code=?', code);
          if (p?.id) await run('INSERT INTO batch_inputs (child_batch_id,parent_batch_id) VALUES (?,?)', row.id, p.id);
        }
      }

      Alert.alert('Saved locally', `${PROCESS_LABEL[type]} saved as ${batchCode}`);
      router.replace(`/dept/sweets/qc/search?code=${encodeURIComponent(batchCode)}`);
    }catch(e:any){
      Alert.alert('Error', String(e?.message ?? e));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Text style={styles.title}>New {PROCESS_LABEL[type]}</Text>
      <TextInput style={styles.input} placeholder="Batch Code (unique)" value={batchCode} onChangeText={setBatchCode} autoCapitalize="characters"/>
      <TextInput style={styles.input} placeholder="Parent Batch Codes (comma separated)" value={parents} onChangeText={setParents}/>
      <View style={{height:8}}/>

      {defs.map(d=>(
        <View key={d.key} style={{marginBottom:10}}>
          <Text style={styles.label}>{d.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={d.hint||d.label}
            keyboardType={d.type==='number'?'numeric':'default'}
            value={fields[d.key]||''}
            onChangeText={(v)=>setField(d.key,v)}
            autoCapitalize="none"
          />
        </View>
      ))}

      {type==='choc_milling' && (
        <Text style={{color:'#9fe870',marginBottom:8}}>
          Total milling: {computed.total_milling_min||0} min
        </Text>
      )}

      <TextInput style={styles.input} placeholder="Notes" value={notes} onChangeText={setNotes}/>
      <Pressable style={styles.btn} onPress={save}><Text style={{fontWeight:'800'}}>Save Draft</Text></Pressable>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#0c0c0c'}, title:{color:'#f6c453',fontSize:20,fontWeight:'800',marginBottom:12},
  input:{backgroundColor:'#fff',padding:10,borderRadius:8,marginBottom:8}, label:{color:'#ddd',marginBottom:6},
  btn:{backgroundColor:'#f6c453',padding:14,borderRadius:10,alignItems:'center',marginTop:8}
});
