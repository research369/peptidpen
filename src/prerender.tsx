import { renderToString } from "react-dom/server";
import HomeContent from "./components/HomeContent";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";

/** Static content is replaced by the client mount. No private/session data. */
export function render(path: string) {
  switch (path) {
    case "": return renderToString(<HomeContent />);
    case "datenschutz": return renderToString(<Datenschutz />);
    case "impressum": return renderToString(<Impressum />);
    case "agb": return renderToString(<AGB />);
    default: return ""; // Never pre-render a personal cart.
  }
}
