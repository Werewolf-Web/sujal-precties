import { createContext } from "react";
import ButtonPrimary from "../common-components/common-button/ButtonPrimary";

export const UserContext = createContext({ name: "Sujal" });

const Settings = () => {
  const user = { name: "Sujal" };

  return (
    <div>
      <UserContext.Provider value={user}>
        <h2>Settings Page</h2>
      </UserContext.Provider>
      <ButtonPrimary
      title="back"
      />
    </div>
  );
};

export default Settings;