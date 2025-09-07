
import { ExpoConfig } from "expo-config";
export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  extra: {
    API_SHOP_BASE: "https://shop.oftimor.com/wp-json/sot/v1",
    API_STREETS_BASE: "https://streets.oftimor.com/wp-json/sot/v1",
  },
});
