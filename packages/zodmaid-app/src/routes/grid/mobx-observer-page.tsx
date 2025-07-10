import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { classNames } from "../../helpers/clsx";

export const MobxObserverPage = () => {
  const ItemViewer = observer(() => {
    const orderJson = {
      orderDate: "2019-12-01",
      items: [
        { id: 1, productName: "Diamond heart", quantity: 1, price: 10.95 },
        { id: 2, productName: "Amber ring", quantity: 2, price: 20.95 },
        { id: 3, productName: "Pearl necklace", quantity: 3, price: 30.95 },
        { id: 4, productName: "Jade earring", quantity: 4, price: 40.95 },
        { id: 5, productName: "Ruby bracelet", quantity: 5, price: 50.95 },
      ],
      shipTo: {
        name: "Helen Zoe",
        street: "47 Eden Street",
        city: "Cambridge",
        postcode: "126",
      },
    };
    const [order] = useState(() => observable(orderJson));
    useEffect(
      action(() => {
        order.items.push({
          id: 6,
          productName: "Sapphire ring",
          quantity: 6,
          price: 60.95,
        });
      }),
      [],
    );
    const item = order.items[5] ?? order.items[4];
    return (
      <div className="py-2">
        <ItemEditor item={item} />
      </div>
    );
  });
  const ItemEditor = observer((props: { item: { productName: string } }) => {
    useEffect(() => {
      console.log("order change", props.item.productName);
    }, [props.item.productName]);

    return (
      <input
        className={classNames(
          "appearance-none border px-1.5 py-0.5",
          "border-gray-400 focus:outline-2 -outline-offset-1 outline-blue-500",
        )}
        type="text"
        value={props.item.productName}
        onChange={action((event) => (props.item.productName = event.target.value))}
      />
    );
  });

  return (
    <div className="min-h-dvh bg-gray-100 text-gray-900 p-4">
      <ItemViewer />
    </div>
  );
};
