export const Button = (props: { onPress: () => void; text: string }) => {
  return <button onClick={props.onPress}>{`${props.text}`}</button>;
};
