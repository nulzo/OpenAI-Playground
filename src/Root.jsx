import NavBar from "./components/ui/navbar";
import SummarizeForm from "./components/forms/summarize";
import { Tabs, TextArea } from "@radix-ui/themes";
import { useCallback, useState } from "react";

export default function Root() {
  const [response, setResponse] = useState({"data": ""});
  const wrapperSetResponse = useCallback(val => {
    setResponse(val);
  }, [setResponse]);
  return (
    <div className="">
      <NavBar />
      <div className="grid grid-cols-12">
        <div className="col-span-3 border-r h-screen border-black">
          <div className="mx-4">
            <Tabs.Root defaultValue="query" className="pb-4">
              <Tabs.List>
                <Tabs.Trigger value="query">Query</Tabs.Trigger>
                <Tabs.Trigger value="summarize">Summarize</Tabs.Trigger>
                <Tabs.Trigger value="dump">Data Dump</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="query">
                <SummarizeForm callbackResponse={wrapperSetResponse} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
        <div className="col-span-9 mx-10 my-10">
            <div className="bg-transparent border flex content-center cursor-default w-full h-full appearance-none" >
              { response.data }
            </div>
        </div>
      </div>
    </div>
  );
}
