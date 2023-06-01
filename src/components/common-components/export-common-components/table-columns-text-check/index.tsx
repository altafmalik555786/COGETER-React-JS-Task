
export const ColTextCheck = (text) => {
  return (
    <p>
      {text ||
        ((typeof text === "number" || typeof text === "string") &&
        Number(text) === 0
          ? 0
          : "--")}
    </p>
  );
};

