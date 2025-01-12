'use client'
import { useRouter } from "next/navigation";

const pathlist = [
  {
    id: 1,
    name: "ཚིག་གསར།",
    path: "/word",
  },
  {
    id: 2,
    name: "དཔར་ཁང་།",
    path: "/publisher",
  },
  {
    id: 3,
    name: "མི་སྣ།",
    path: "/person",
  },
  {
    id: 4,
    name: "དཔེ་ཆ།",
    path: "/book",
  },
];

const Home = () => {
  const router = useRouter();
  return (
    <div className="flex w-full mt-7 flex-col items-center justify-center ">
      <div className="flex items-center justify-center mt-8 mb-2">
        <img className=" w-16 h-16 rounded-md" src="/images/logo.webp" alt="Logo" />
      </div>
      <div className="flex align-middle justify-center">
        <p className="cursor-default text-2xl font-semibold font-monlam">
          སྨོན་ལམ་ཚིག་མཛོད་ཆེན་མོ།
        </p>
      </div>

      <div className="grid align-middle justify-center mt-8">
        {pathlist.map((item) => (
          <div
            key={item.id}
            onClick={() =>router.push(item.path)}
            className="rounded cursor-pointer transition-all w-72 flex justify-between items-center hover:bg-slate-100 p-2"
          >
            <p className=" text-lg font-medium font-monlam">{item.name}</p>
            <p className="text-lg">+</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
