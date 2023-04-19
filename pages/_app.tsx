import "../styles/fontStyle.css";
import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHydrateAtoms } from "jotai/react/utils";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import { queryClientAtom } from "jotai-tanstack-query";

const queryClient = new QueryClient();

interface HydrateAtomsProps {
  children: React.ReactNode;
}

const HydrateAtoms = ({ children }: HydrateAtomsProps) => {
  useHydrateAtoms(new Map([[queryClientAtom, queryClient]]));
  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HydrateAtoms>
          <Component {...pageProps} />
        </HydrateAtoms>
      </Provider>
    </QueryClientProvider>
  );
}
