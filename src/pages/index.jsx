import MainPageMaps from "../components/MainPageMaps";
import SidePanel from "./sidepanel";

export default function MyApp() {
  return (
    <div className="flex">
      <div className="w-1/2">
        <MainPageMaps />
      </div>
    </div>
  );
}
