import { useEffect, useState } from "react";

export const FakeComponent = (): JSX.Element => {
  const [randomContent, setRandomContent] = useState("");

  const getRandomContent = () => {
    const contents = [
      "Lorem ipsum dolor sit amet.",
      "Consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt.",
      "Ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam.",
      "Quis nostrud exercitation ullamco.",
      "Laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit.",
      "Excepteur sint occaecat cupidatat non proident.",
      "Sunt in culpa qui officia deserunt mollit anim id est laborum.",

      // Add more content here...
    ];

    const randomIndex = Math.floor(Math.random() * contents.length);
    return contents[randomIndex];
  };

  useEffect(() => {
    setRandomContent(getRandomContent());
  }, []);

  return (
    <>
      <p>
        This is a fake component. It is here to demonstrate that the React app
        is
      </p>
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold bg-gray-200">
        {randomContent}{" "}
      </div>
     
    </>
  );
};

export default FakeComponent;
