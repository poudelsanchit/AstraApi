import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Main = () => {
  const data = [
    {
      name: "Parameters",
    },
    {
      name: "Body",
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
    <div className="py-2  text-white font-Inter text-sm border-b-[0.1px] border-border">
      <Tabs defaultValue="Parameters" className="w-full ">
        <TabsList className="border-b-[0.1px] border-border px-2 w-full">
          {data.map(({ name }) => {
            return <TabsTrigger value={name}>{name}</TabsTrigger>;
          })}
        </TabsList>
        {data.map(({ name }) => {
          return (
            <TabsContent value={name} className="px-4">
              <div className="h-32"> {name}</div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Main;
