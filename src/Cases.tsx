import { ReactElement, useCallback, useEffect, useState } from "react";
import { Button } from "./Components";
import {
  useDetectRerenderCauseDeps,
  useDetectRerenderCauseProps,
} from "./hooks/useDetectRerenderCause";

type Case = {
  title: string;
  description: string;
  Component: () => ReactElement;
  code?: string;
};

const TestComponent = (props: {
  num?: number;
  func?: () => void;
  arr?: number[];
  obj?: Object;
}) => {
  useDetectRerenderCauseProps({ props: props, name: "Test Component" });
  return (
    <div>{`This is a test component. It's watching for changes to properties.`}</div>
  );
};

const cases: Case[] = [
  {
    title: "Example 1",
    description: "A useEffect that fires when a number increments",
    Component: () => {
      const [num, setNum] = useState(0);
      useDetectRerenderCauseDeps({
        name: "Effect Case 1",
        deps: [num],
      });
      useEffect(() => {}, [num]);
      return (
        <>
          <div>{num}</div>
          <Button onPress={() => setNum((prev) => prev + 1)} text="increase" />
        </>
      );
    },
  },
  {
    title: "Example 2",
    description: "A useEffect that fires because a function recalculates",
    Component: () => {
      const [num, setNum] = useState(0);
      const func = useCallback(() => setNum(num + 1), [num]);
      useDetectRerenderCauseDeps({
        name: "Effect Case 2",
        deps: [func],
      });
      useEffect(() => {}, [func]);
      return (
        <>
          <div>{num}</div>
          <Button onPress={func} text="increase" />
        </>
      );
    },
  },
  {
    title: "Example 3",
    description: "A useEffect that fires because an array mutates",
    Component: () => {
      const [arr, setArr] = useState([0, 1, 2]);
      useDetectRerenderCauseDeps({
        name: "Effect Case 3",
        deps: [arr],
      });
      useEffect(() => {}, [arr]);
      return (
        <>
          <div>{`${[arr.join(",")]}`}</div>
          <Button
            onPress={() => setArr((prev) => [prev[0], prev[1] + 1, prev[2]])}
            text="increase"
          />
        </>
      );
    },
  },
  {
    title: "Example 4",
    description: "A useEffect that fires because an object is replaced",
    Component: () => {
      const [obj, setObj] = useState({ num: 0 });
      useDetectRerenderCauseDeps({
        name: "Effect Case 4",
        deps: [obj],
      });
      useEffect(() => {}, [obj]);
      return (
        <>
          <div>{`${JSON.stringify(obj)}`}</div>
          <Button
            onPress={() => setObj((prev) => ({ num: prev.num + 1 }))}
            text="increase"
          />
        </>
      );
    },
  },
  {
    title: "Example 5",
    description: "A test component that fires when a number increments",
    Component: () => {
      const [num, setNum] = useState(0);
      return (
        <>
          <div>{num}</div>
          <div>
            <Button
              onPress={() => setNum((prev) => prev + 1)}
              text="increase"
            />
          </div>
          <TestComponent num={num} />
        </>
      );
    },
  },
  {
    title: "Example 6",
    description: "A test component that fires because a function recalculates",
    Component: () => {
      const [num, setNum] = useState(0);
      const func = useCallback(() => setNum(num + 1), [num]);

      return (
        <>
          <div>{num}</div>
          <div>
            <Button
              onPress={() => setNum((prev) => prev + 1)}
              text="increase"
            />
          </div>
          <TestComponent func={func} />
        </>
      );
    },
  },
  {
    title: "Example 7",
    description: "A test component that updates when an array updates",
    Component: () => {
      const [arr, setArr] = useState([0, 1, 2]);
      return (
        <>
          <div>{`${[arr.join(",")]}`}</div>
          <Button
            onPress={() => setArr((prev) => [prev[0], prev[1] + 1, prev[2]])}
            text="increase"
          />
          <TestComponent arr={arr} />
        </>
      );
    },
  },
  {
    title: "Example 8",
    description: "A test component that updates when an object updates",
    Component: () => {
      const [obj, setObj] = useState({ num: 0 });
      return (
        <>
          <div>{`${JSON.stringify(obj)}`}</div>
          <Button
            onPress={() => setObj((prev) => ({ num: prev.num + 1 }))}
            text="increase"
          />
          <TestComponent obj={obj} />
        </>
      );
    },
  },
];

export const Cases = () => {
  return (
    <>
      {cases.map((itm) => (
        <div
          style={{
            margin: 5,
            padding: 5,
            border: "solid black 1px",
            background: "white",
          }}
        >
          <div>{itm.title}</div>
          <div>{itm.description}</div>
          <div>{itm.Component()}</div>
        </div>
      ))}
    </>
  );
};
