import PluginId from "../pluginId";

import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import ColorPlugin from "editorjs-text-color-plugin";
import ChangeCase from "editorjs-change-case";

const customTools = {
  header: {
    class: Header,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ["anyTuneName"],
  },
  anyTuneName: {
    class: AlignmentTuneTool,
    config: {
      default: "left",
      blocks: {
        header: "left",
      },
    },
  },
  changeCase: {
    class: ChangeCase,
  },
  Color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        "#50BEC8",
        "#1B7780",
        "#222222",
        "#464646",
        "#e1e1e1",
        "#FFFFFF",
        "#000000",
        "#2DC26B",
        "#F1C40F",
        "#E03E2D",
        "#B96AD9",
        "3598DB",
        "169179",
        "E67E23",
      ],
      defaultColor: "#50BEC8",
      type: "text",
      customPicker: true, // add a button to allow selecting any colour
    },
  },
  // embed: Embed,
  // table: {
  //   class: Table,
  //   inlineToolbar: true,
  // },
  // list: {
  //   class: List,
  //   inlineToolbar: true,
  // },
  // warning: {
  //   class: Warning,
  //   inlineToolbar: true,
  //   config: {
  //     titlePlaceholder: 'Title',
  //     messagePlaceholder: 'Message',
  //   },
  // },
  // code: Code,
  // LinkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: `/api/${PluginId}/link`,
  //   },
  // },
  // raw: {
  //   class: Raw,
  //   inlineToolbar: true,
  // },

  // quote: {
  //   class: Quote,
  //   inlineToolbar: true,
  //   config: {
  //     quotePlaceholder: 'Quote',
  //     captionPlaceholder: 'Quote`s author',
  //   },
  // },
  // marker: {
  //   class: Marker,
  //   inlineToolbar: true,
  // },
  // checklist: {
  //   class: CheckList,
  //   inlineToolbar: true,
  // },
  // delimiter: Delimiter,
  // inlineCode: InlineCode,
};

export default customTools;
