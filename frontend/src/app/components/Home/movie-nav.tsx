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
    <>
      {nav.map((item, index) => {
        return (
          <Link
            key={index}
            href={`#${item.path}`}
            scroll={true}
            className="hover:translate-y-[-5px] transition-all"
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
}
