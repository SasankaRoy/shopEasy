import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const forMen = [
  {
    header: "Top-Wears",
    subFilters: [
      "T-shirts",
      "Causal shirts",
      "Formal shirts",
      "Sweatshirts",
      "Sweaters",
      "Jackets",
      "Blazers & Coats",
      "Suits",
      "Rain jackets",
    ],
  },
  {
    header: "Bottom-Wears",
    subFilters: [
      "Jeans",
      "Causal Trousers",
      "Formal Trousers",
      "Shorts",
      "Track Pants & Joggers",
    ],
  },
  {
    header: "Foot-Wears",
    subFilters: [
      "Causal shoes",
      "Sports shoes",
      "Formal shoes",
      "Sneakers",
      "Sandles & Floaters",
      "Flip Flops",
      "Socks",
    ],
  },
  {
    header: "Indian Festival",
    subFilters: ["Kurtas & Kurta sets", "Sherwanis", "Nehru jackets", "Dhotis"],
  },
];
const forWomen = [
  {
    header: "Indian & Fusion Wears",
    subFilters: [
      "Kurtas & suits",
      "Kurtis,Tunics & Tops",
      "Sarees",
      "Ethnic Wear",
      "Leggings,Salwars & Churidars",
      "Skirts & Palazzos",
      "Dess Materials",
      "Lehenga & Cholis",
      "Dupattas & Shawls",
      "Jackets",
    ],
  },
  {
    header: "Western-Wears",
    subFilters: [
      "Dresses",
      "Tops",
      "T-shirts",
      "Jeans",
      "Trousers & Capris",
      "Shorts & Skrits",
      "Co-ords",
      "Sweaters & Sweatshirts",
      "Jackets & Coats",
      "Blazers & Waistcoats",
    ],
  },
  {
    header: "Foot-Wears",
    subFilters: [
      "Flats",
      "Casual shoes",
      "Heels",
      "Boots",
      "Sports shoes & Floaters",
    ],
  },
  {
    header: "Beauty & personal care",
    subFilters: [
      "Makeups",
      "Skincare",
      "Permium Beauty",
      "Lipsticks",
      "Fragrances",
    ],
  },
];
const forKids = [
  {
    header: "Boys Clothings",
    subFilters: [
      "T-shirts",
      "Shirts",
      "Shorts",
      "Jeans",
      "Trouses",
      "Clothing sets",
      "Track Pants & pyjamas",
      "Ethnic wears",
      "Jackets,Sweaters & Sweatshirts",
      "Party wears",
      "Innerswears & Thermals",
      "Nightwears",
    ],
  },
  {
    header: "Gitls Clothings",
    subFilters: [
      "Dresses",
      "Tops",
      "T-shirts",
      "Clothing sets",
      "Lehenga choli",
      "Party wears",
      "Kurta sets",
      "Dungarees & Jumpsuits",
      "Skirts & shorts",
      "Jeans,Trousers & Capris",
      "Innerswears & Thermals",
      "Nightwears",
    ],
  },
  {
    header: "Foot-Wears",
    subFilters: [
      "Casual shoes",
      "Heels",
      "Sports shoes",
      "Flats",
      "Sandals",
      "Schools shoes",
      "sockes",
    ],
  },
  {
    header: "Infants",
    subFilters: [
      "Dresses",
      "Bodysuits",
      "Rompers & Sleepsuits",
      "Clothing sets",
      "Bottomwears",
      "Tops & Tshirts",
      "Innerwears & Thermals",
      "Infants Cares",
    ],
  },
];
const Accessories = [
  {
    header: "Accessories",
    subFilters: [
      "Wallets",
      "Belts",
      "Perfumes & Body Mists",
      "Trimmers",
      "Deodorants",
      "Cufflinks & Pockets squares",
      "Caps & Hats",
      "Rings & Wristwears",
    ],
  },
];
const Gadgets = [
  {
    header: "Gadgets",
    subFilters: [
      "Fitness gadgets",
      "Speakers",
      "Headphones & Earsphones",
      "Smart Watches",
    ],
  },
];
const FilterModel = ({ showFilter, setShowFilter }) => {
  const [FiltersFor, setFiltersFor] = useState([]);
  const router = useRouter();

  useEffect(() => {
    switch (showFilter.type) {
      case "Men":
        setFiltersFor(forMen);
        break;
      case "Women":
        setFiltersFor(forWomen);
        break;
      case "Kids":
        setFiltersFor(forKids);
        break;
      case "Accessories":
        setFiltersFor(Accessories);
        break;
      case "Electronic Gadgets":
        setFiltersFor(Gadgets);
        break;
      default:
        setFiltersFor(forMen);
    }
  }, [showFilter.type]);

  return (
    <>
      <div
        className="bg-[#ffffff] absolute w-full top-[4.5rem] h-auto py-2 shadow-lg"
        onMouseLeave={() => setShowFilter(false)}
      >
        <div className="w-[90%] h-full grid grid-cols-4 gap-7 p-2 mx-auto">
          {FiltersFor?.map((cur, id) => (
            <div key={id}>
              <h1 className="text-lg tracking-wider capitalize font-semibold text-pink-600 underline underline-offset-4">
                {cur.header}
              </h1>
              <ol className="flex flex-col justify-start items-start mt-2 p-1 space-y-1 w-full">
                {cur.subFilters?.map((cur, id) => (
                  <motion.li
                    key={id}
                    onClick={() => {
                      router.push(
                        `/category/${showFilter.type.toLowerCase()}?sub=${cur.toLowerCase()}`
                      );
                      setShowFilter(false);
                      console.log(`/category/${showFilter.type.toLowerCase()}?sub=${cur.toLowerCase()}`)
                    }}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeIn" }}
                    className="text-md py-1 px-2 rounded-md tracking-wider font-semibold text-[#212a2f]/80 hover:text-bold hover:text-[#212a2f] hover:bg-[#212a2f]/10 transition-all duration-100 ease-linear cursor-pointer w-full"
                  >
                    {cur}
                  </motion.li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FilterModel;
