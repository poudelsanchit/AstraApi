
const Json = () => {
  const jsonData = {
    name: "John Doe",
    age: 30,
    city: "New York",
    hobbies: ["reading", "gaming"],
    address: {
      street: "123 Main St",
      city: "New York",
      zip: "10001",
    },
  };
  const jsonString = JSON.stringify(jsonData, null, 2); // 2 spaces indentation

  return (
    <div className="flex">
      <div>JSON</div>
      <textarea className="bg-primaryBackground text-white h-96 w-96" name="" id=""          value={jsonString}
      ></textarea>
    </div>
  );
};

export default Json;
