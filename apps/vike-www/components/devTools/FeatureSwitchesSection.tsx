import * as React from "react";
import { useContext, useMemo } from "react";
import { DropdownMenu, ListItem, Space, Subheading, Text } from "@classdojo/web/nessie";
import { UndoIcon } from "@classdojo/web/nessie/icons";
import { DevToolsSettings } from "./devToolsSettings";
import { AppDataContext } from "../AppDataContext";
import { MobileDataContext } from "../mobile/MobileDataContext";

type FeatureSwitchConfigShape<T extends string> = {
  name: T;
  value: string;
  predefinedValues: string[];
};

export const FeatureSwitchesSectionContainer = ({
  windowObject,
  mobile,
}: {
  windowObject: typeof window;
  mobile?: boolean;
}) => {
  const ctx: React.Context<{ data: { featureFlags: Record<string, string> } }> = mobile
    ? MobileDataContext
    : AppDataContext;
  const appData = useContext(ctx);

  const featureSwitchesValues = appData?.data?.featureFlags as Record<string, string>;

  const {
    featureSwitchOverrides,
    hasFeatureSwitchOverrides,
    setFeatureSwitchOverride,
    clearFeatureSwitchOverride,
    clearAllFeatureSwitchOverrides,
  } = DevToolsSettings.useFeatureSwitchOverrides();

  const featureSwitches = useMemo(
    () =>
      Object.entries(featureSwitchesValues).map(([fsName, value]) => {
        return {
          name: fsName,
          value: featureSwitchOverrides[fsName] ?? value.toString(),
          predefinedValues: ["on", "off", "exposure", "control", "test"],
        };
      }),
    [featureSwitchesValues, featureSwitchOverrides],
  );

  return (
    <FeatureSwitchesSection
      featureSwitches={featureSwitches}
      hasChanges={hasFeatureSwitchOverrides}
      onChange={setFeatureSwitchOverride}
      resetFeatureSwitch={clearFeatureSwitchOverride}
      resetAllFeatureSwitches={clearAllFeatureSwitchOverrides}
      windowObject={windowObject || window}
    />
  );
};

const FeatureSwitchesSection = ({
  featureSwitches,
  hasChanges,
  onChange,
  resetFeatureSwitch,
  resetAllFeatureSwitches,
  windowObject,
}: FeatureSwitchesSectionProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: "12px",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <Subheading>
            Feature Switches
            {hasChanges && (
              <>
                <Space kind="inline" size="xs" />
                <Text inline color="pitaya">
                  (has overrides)
                </Text>
              </>
            )}
          </Subheading>
        </div>
        <div style={{ position: "relative" }}>
          <UndoIcon cursor="pointer" onClick={resetAllFeatureSwitches} />
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        {featureSwitches?.map((fs) => {
          return (
            <FeatureSwitchItem
              key={fs.name}
              name={fs.name}
              value={fs.value}
              predefinedValues={fs.predefinedValues}
              onChange={onChange}
              windowObject={windowObject}
              resetFeatureSwitch={resetFeatureSwitch}
            />
          );
        })}
      </div>
    </div>
  );
};
type FeatureSwitchesSectionProps = {
  featureSwitches?: FeatureSwitchConfigShape<string>[];
  hasChanges?: boolean;
  onChange: (name: string, value: string) => void;
  resetFeatureSwitch: (name: string) => void;
  resetAllFeatureSwitches: () => void;
  windowObject: typeof window;
};

const FeatureSwitchItem = ({
  name,
  value,
  predefinedValues,
  onChange,
  windowObject,
  resetFeatureSwitch,
}: FeatureSwitchItemProps) => {
  const menuItems = [
    ...(predefinedValues || []).map((value) => ({
      value,
      onClick: () => onChange(name, value),
    })),
    {
      value: "Custom...",
      onClick: () => {
        const newValue = windowObject.prompt(`Please enter new value for [${name}]`);
        if (newValue) {
          onChange(name, newValue);
        }
      },
    },
  ];

  const menuOptions = menuItems.map((menuItem) => ({
    label: menuItem.value,
    onClick: menuItem.onClick,
    opensAModal: false,
  }));

  return (
    <div
      style={{
        paddingTop: "12px",
        paddingBottom: "12px",
        borderBottom: "1px solid",
        borderColor: "dt_taro30",
        position: "relative",
      }}
    >
      <ListItem
        title={<div style={{ wordBreak: "break-all", fontSize: "18px", fontWeight: "bold" }}>{name}</div>}
        rightAccessory={
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "relative" }}>
            <DropdownMenu
              color={value === "off" ? "dt_taro40" : "dt_aqua50"}
              trigger={<span style={{ fontSize: "20px" }}>{value}</span>}
              options={menuOptions}
              label={value}
              caret
            />
            <div style={{ marginLeft: "12px", position: "relative" }}>
              <UndoIcon cursor="pointer" size="s" onClick={() => resetFeatureSwitch(name)} />
            </div>
          </div>
        }
      />
    </div>
  );
};
type FeatureSwitchItemProps = {
  name: string;
  value: string;
  predefinedValues: string[];
  onChange: (name: string, value: string) => void;
  windowObject: typeof window;
  resetFeatureSwitch: (name: string) => void;
};
