/**
 * @classdojo/web, after version 7.0.0, started adopting some of the new styling guidelines,
 * including using Theme-UI + Emotion, the `sx` prop for styling with theme lookup,
 * and enforcing validation of the theme design tokens used, like colors names for example.
 *
 * This requires having the NessieThemeProvider component rendered in the app component tree
 * before being able to use nessie components.
 *
 * Up to now, all the Nessie components used in External site, like <Title> or <Button>,
 * were referencing theme values it needed directly, without any automatic lookup, so there was
 * no need to make the Nessie theme available through a provider on the component tree context.
 *
 * External site also uses Emotion for styling components and defines its own custom theme,
 * which it is providing in the app tree using Emotion's <ThemeProvider> component.
 *
 * This means we would need to have External site's theme provided for some components,
 * and Nessie's theme provided for using components from @classdojo/web/nessie. This is not
 * easy to do using Emotion's theming capabilities, which does a shallow merge of themes
 * when we nest one theme provider inside another.
 * See https://emotion.sh/docs/emotion-theming#themeprovider-reactcomponenttype for more info.
 *
 * As a quick temporary solution to allow us to continue using some of @classdojo/web components
 * with packages newer than v7.0.0, the files in this folder are wrapping the needed components
 * with <NessieThemeProvider> and re-exporting that as the component to use inside External site project.
 * This way, other parts of the component tree get the External site's theme by default, and
 * the components wrapped in this way get Nessie's theme.
 *
 * So, if you want to use a component from @classdojo/web, you should first create a wrapper for it
 * inside this folder, and then import that where you need to use it, instead of importing it directly
 * from @classdojo/web package.
 */

export { theme } from "@classdojo/web/nessie";
export { Action } from "./Action";
export { BodyText } from "./BodyText";
export { Button } from "./Button";
export { Caption } from "./Caption";
export { DetailHeading } from "./DetailHeading";
export { DetailAction } from "./DetailAction";
export { DeprecatedDetailText } from "./DeprecatedDetailText";
export { ListItem } from "./ListItem";
export { Modal, ModalContent, ModalCloseButton, ModalTitle } from "./Modal";
export { Heading } from "./Heading";
export { Subheading } from "./Subheading";
export { Title } from "./Title";
export { DetailText } from "./DetailText";
export { Space } from "./Space";
export { TextField } from "./TextField";
export { TextArea } from "./TextArea";
export { Menu } from "./Menu";
export { CloseIcon } from "./CloseIcon";
export { DownCaretIcon } from "./DownCaretIcon";
export { InputGroup, CheckboxInput } from "./CheckboxInput";
export { Tooltip } from "./Tooltip";
export * from "./Icons";
