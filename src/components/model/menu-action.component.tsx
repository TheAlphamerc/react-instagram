import React, { useEffect, useState } from "react";
import { Modal } from "./model";
import cx from "classnames";

interface Prop {
  active: boolean;
  setActive: (_: boolean) => {};
  actions: Array<Action>;
}
export const ActionLevel = Object.freeze({ default: 1, primary: 2, alert: 3 });
export class Action {
  label: String;
  action: () => {};
  actionLevel: number;

  constructor(
    label: String,
    action: () => {},
    actionLevel: number = ActionLevel.default
  ) {
    this.label = label;
    this.action = action;
    this.actionLevel = actionLevel;
  }
}

function PostMenuComponent({ active, setActive, actions }: Prop) {
  return (
    <div className="h-">
      <Modal
        width={400}
        active={active}
        setActive={(e) => {
          setActive(e);
        }}
      >
        <div className="flex flex-col">
          {actions.map((action, index) => (
            <ActionButton key={index} action={action} setActive={setActive} />
          ))}
        </div>
      </Modal>
    </div>
  );
}

function ActionButton({
  action,
  setActive,
}: {
  action: Action;
  setActive: (_: boolean) => {};
}) {
  if(action == null || action === undefined){
    return null;
  }
  return (
    <div
      onClick={() => {
        action.action();
        setActive(false);
      }}
      className={cx("p-2 rounded hover:bg-gray-100", {
        "text-gray-600": action.actionLevel === ActionLevel.default,
        "text-blue-500": action.actionLevel === ActionLevel.primary,
        "text-red-500": action.actionLevel === ActionLevel.alert,
      })}
    >
      {action.label}
    </div>
  );
}

export default PostMenuComponent;
