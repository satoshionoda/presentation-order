import Head from "next/head";
import { useEffect, useState } from "react";
import { ListItem } from "../components/list-item";
import { nanoid } from "nanoid";

export type ListData = {
  name: string;
  isLocked: boolean;
  id: string;
};

export default function Home() {
  const [listState, setListState] = useState<ListData[]>([]);
  const add = () => {
    const input = document.querySelector<HTMLInputElement>("#nameInput");
    if (input && input.value) {
      setListState((prev) => {
        const item = { name: input.value, isLocked: false, id: nanoid() };
        return [...prev, item];
      });
      setTimeout(() => {
        input.value = "";
      }, 16);
    }
  };
  const onClickRandom = () => {
    setListState((prev) => randomize(prev));
  };
  const onClickLock = (index: number) => {
    setListState((prev) => {
      return prev.map((item, i) =>
        i !== index ? item : { ...item, isLocked: !item.isLocked }
      );
    });
  };
  const onClickDelete = (index: number) => {
    setListState((prev) => {
      return prev.filter((item, i) => i !== index);
    });
  };
  const onDropReceive = (myIndex: number, targetIndex: number) => {
    setListState((prev) => {
      return reorder(prev, targetIndex, myIndex);
    });
  };

  useEffect(() => {
    const data = window.localStorage.getItem("data");
    if (data) {
      setListState(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(listState));
  }, [listState]);

  return (
    <div>
      <Head>
        <title>Presentation Order</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative ml-auto mr-auto w-2/3 mb-12">
        <div className="flex gap-2 border p-6 mt-8 mb-8 rounded ">
          <input
            id="nameInput"
            type="text"
            placeholder={"名前を入れてね"}
            className="border p-1 w-96"
          />
          <span
            className="flex cursor-pointer  items-center justify-center tracking-widest bg-yellow-500 text-white rounded-2xl  pl-5 pr-5 mr-5"
            onClick={add}
          >
            ADD
          </span>
          <span
            className="flex cursor-pointer  items-center justify-center tracking-widest bg-red-500 text-white rounded-2xl pl-5 pr-5"
            onClick={onClickRandom}
          >
            Randomize!
          </span>
        </div>

        <ul>
          {listState.map(({ name, isLocked, id }, index) => (
            <ListItem
              key={id}
              {...{
                name,
                id,
                isLocked,
                index,
                onClickLock,
                onClickDelete,
                onDropReceive,
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const randomize = (data: ListData[]): ListData[] => {
  const result: ListData[] = [...data].filter((r: ListData) => !r.isLocked);
  shuffle(result);
  data.forEach((item, i) => {
    if (item.isLocked) {
      result.splice(i, 0, item);
    }
  });
  return result;
};
const reorder = (data: ListData[], from: number, to: number): ListData[] => {
  const result: ListData[] = [...data];
  const spliced = result.splice(from, 1)[0];
  result.splice(to, 0, spliced);
  let i = 0;
  while (i < data.length) {
    const item = result[i];
    if (item.isLocked) {
      const index = data.findIndex((r) => r.id === item.id);
      result.splice(i, 1);
      result.splice(index, 0, item);
    }
    i++;
  }
  return result;
};

function shuffle<T>(array: T[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const __TEST__ = { randomize, reorder };