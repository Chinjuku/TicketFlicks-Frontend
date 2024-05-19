import Link from "next/link";

export default function MovieNav() {
  const nav = [
    {
      name: "NOW SHOWING",
      path: "now",
    },
    {
      name: "COMING SOON",
      path: "come",
    },
    {
      name: "RECOMMANDED",
      path: "rec",
    },
    {
      name: "FAVORITE",
      path: "fav",
    },
  ];
  return (
    <div className="h-[90%] flex items-center justify-center gap-[10%] tablet:gap-[6%] flex-1 flex-wrap flex-grow max-h-[200px]">
      {nav.map((item, index) => {
        return (
          <Link
            key={index}
            href={`#${item.path}`}
            scroll={true}
            className='phone:py-1 rounded text-center tablet:w-[27%] phone:w-full phone:bg-secondary phone:text-[12px] desktop:text-[28px] laptop:text-[22px] tablet:text-[16px] font-bold hover:translate-y-[-5px] bg-transparent text-white transition-all'
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
