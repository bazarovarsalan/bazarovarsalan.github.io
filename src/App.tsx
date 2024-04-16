import "./App.css";
import AllComments from "./ui/components/AllComments";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import GlobalStyles from "./assets/styles/GlobalStyles";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GlobalStyles />
                <AllComments />
            </QueryClientProvider>
        </>
    );
}

export default App;
