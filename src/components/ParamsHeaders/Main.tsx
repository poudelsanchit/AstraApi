import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import RequestBody from "./RequestBody";
import Params from "./Params";

interface MainProps {
  json:any
  setRequestBody:any
  params: { parameter: string; value: string }[];
  setParams: (data: { parameter: string; value: string }[]) => void;
}

const Main = ({json,setRequestBody ,params, setParams }: MainProps) => {
  const data = [
    {
      name: "Parameters",
      component: <Params data={params} setData={setParams} />,
    },
    {
      name: "Body",
      component: <RequestBody json={json} setRequestBody={setRequestBody}/>,
    },
    {
      name: "Headers",
    },
    {
      name: "Authorization",
    },
    {
      name: "Pre-request Script",
    },
    {
      name: "Tests",
    },
  ];
  return (
    <div className="py-2 text-white font-Inter text-lg border-b-[0.1px] border-border ">
      <Tabs defaultValue="Parameters" className="w-full">
        <TabsList className="border-b-[0.1px] border-border px-2 w-full overflow-x-auto overflow-y-hidden sm:overflow-hidden">
          {data.map(({ name }) => {
            return <TabsTrigger value={name}>{name}</TabsTrigger>;
          })}
        </TabsList>
        {data.map(({ name, component }) => {
          return (
            <TabsContent value={name} className="pl-4">
              {component}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Main;
