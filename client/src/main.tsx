import ReactDOM from "react-dom/client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import App from "./App";
import { queryClient } from "./api/queryClient";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "moonflix-rq",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
      maxAge: 1000 * 60 * 60 * 24,
      buster: "v1",
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => query.queryKey[0] === "user",
      },
    }}
  >
    <App />
  </PersistQueryClientProvider>,
);
