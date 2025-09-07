
import Constants from "expo-constants";
type Extra = { API_SHOP_BASE: string; API_STREETS_BASE: string };
const extra = (Constants.expoConfig?.extra || {}) as Extra;

export const apiShop = (p: string) => `${extra.API_SHOP_BASE}${p}`;
export const apiStreets = (p: string) => `${extra.API_STREETS_BASE}${p}`;
