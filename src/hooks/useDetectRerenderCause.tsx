import { useEffect, useState } from "react";

export const useDetectRerenderCauseDeps = (props: {
  name: string;
  deps: Array<any>;
  labels?: string[];
}) => {
  useEffect(
    () => console.info(`Watching effect with name ${props.name}`),
    [props.name]
  );
  const [prevDeps, setPrevDeps] = useState(props.deps);
  useEffect(() => {
    const keys =
      props.labels ?? props.deps.map((_val, i) => `Array Dependency ${i}`);
    if (detectChanges(props.name, prevDeps, props.deps, keys)) {
      setPrevDeps(props.deps);
    }
  }, [setPrevDeps, prevDeps, props.deps, props.labels, props.name]);
};

export const useDetectRerenderCauseProps = (props: {
  name: string;
  props: any;
}) => {
  useEffect(
    () => console.info(`Watching a component with name ${props.name}`),
    [props.name]
  );
  const [prevProps, setPrevProps] = useState(Object.values(props.props));

  useEffect(() => {
    if (
      detectChanges(
        props.name,
        prevProps,
        Object.values(props.props),
        Object.keys(props.props)
      )
    ) {
      setPrevProps(Object.values(props.props));
    }
  }, [setPrevProps, prevProps, props.props, props.name]);
};

const detectChanges = (
  name: string,
  prevVals: Array<any>,
  newVals: Array<any>,
  keys: Array<string>
) => {
  if (prevVals.length !== newVals.length || prevVals.length !== keys.length) {
    console.error(
      `useDetectRenderCause, prevVals, newVals and keys have differerent lengths (${newVals.length} ${prevVals.length} ${keys.length})`
    );
    return false;
  }
  let changeFlag = false;
  for (let i = 0; i < prevVals.length; i++) {
    if (prevVals[i] !== newVals[i]) {
      console.info(`Rerender in ${name} caused by "${keys[i]}"`);
      console.info(`Prev value: [${prevVals[i]}]`);
      console.info(`New  value: [${newVals[i]}]`);
      changeFlag = true;
    }
    return changeFlag;
  }
};
