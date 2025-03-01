import { getNodeEnv } from "@config";

export const revalidate = getNodeEnv() === 'development' ? 0 : 120;

export default function Home() {
  return (
    <>
      
    </>
  );
}