    
    


    export default function ProductTab({ activeTab, setActiveTab }) {
         const tabClass = (tab) =>
       `px-4 py-2 text-sm cursor-pointer border-b-2 transition
         ${
       activeTab === tab
         ? "border-blue-600 text-blue-600 font-medium"
         : "border-transparent text-gray-500 hover:text-gray-700"
     }`;

  return (
    <div className="flex gap-6 border-b mb-6">
      <p
        className={tabClass("published")}
        onClick={() => setActiveTab("published")}
      >
        Published
      </p>

      <p
        className={tabClass("unpublished")}
        onClick={() => setActiveTab("unpublished")}
      >
        Unpublished
      </p>
    </div>
  );
}
