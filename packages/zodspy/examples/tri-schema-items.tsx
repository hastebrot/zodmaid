import type { TriItem } from "../components/tri/tri-data-model";

export const items: TriItem[] = [
  {
    title: "Person name",
    type: "plain",
    tags: [{ title: "Person" }],
    items: [
      {
        title: "Company",
        description: "Name of the organization",
        type: "field:plain",
        view: "field",
        items: [
          // wrap.
          { title: "Company name", type: "plain", tags: [{ title: "Company" }] },
        ],
      },
      {
        title: "Role",
        description: "Job title of the person",
        type: "field:plain",
        view: "field",
        items: [
          // wrap.
          { title: "", type: "plain" },
        ],
      },
      {
        title: "Email",
        type: "field:email",
        view: "field",
        items: [
          // wrap.
          { title: "", type: "plain" },
        ],
      },
      {
        title: "Text",
        type: "plain",
        items: [
          // wrap.
          { title: "Text", type: "plain" },
        ],
      },
      { title: "Text", type: "plain", isFolded: true },
      { title: "Text", type: "plain", isFolded: true },
    ],
  },
  {
    title: "Company name",
    type: "plain",
    tags: [{ title: "Company" }],
    items: [
      {
        title: "People",
        type: "plain",
        items: [
          // wrap.
          { title: "Person name", type: "plain", tags: [{ title: "Person" }] },
        ],
      },
    ],
  },
  {
    title: "Album",
    type: "field:tag",
    // view: "field",
    items: [
      // wrap.
      {
        title: "Name",
        type: "field:plain",
        view: "field",
        items: [{ title: "", type: "plain" }],
      },
      {
        title: "Genre",
        type: "field:plain",
        view: "field",
        items: [{ title: "", type: "plain" }],
      },
      {
        title: "ReleaseDate",
        type: "field:plain",
        view: "field",
        items: [
          { title: "", type: "plain" },
          {
            title: "Pattern",
            type: "field:code",
            view: "field",
            items: [{ title: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$", type: "plain" }],
          },
        ],
      },
      {
        title: "Label",
        type: "field:plain",
        view: "field",
        items: [{ title: "", type: "plain" }],
      },
      {
        title: "Tracks",
        type: "field:plain",
        view: "field",
        items: [{ title: "", type: "plain" }],
      },
    ],
  },
  {
    title: "Track",
    type: "field:tag",
    // view: "field",
    items: [
      // wrap.
      {
        title: "Title",
        type: "field:plain",
        view: "field",
        items: [{ title: "", type: "plain" }],
      },
      {
        title: "Duration",
        type: "field:plain",
        view: "field",
        items: [
          {
            title: "",
            type: "plain",
          },
          {
            title: "Pattern",
            type: "field:code",
            view: "field",
            items: [{ title: "^[0-9]{2}:[0-9]{2}$", type: "plain" }],
          },
        ],
      },
      {
        title: "Writer",
        type: "field:plain",
        view: "field",
        items: [
          {
            title: "",
            type: "plain",
          },
          {
            title: "Optional",
            type: "field:bool",
            view: "field",
            items: [{ title: "True", type: "plain" }],
          },
        ],
      },
    ],
  },
  {
    title: "Table view",
    type: "plain",
    view: "table",
    items: [
      {
        title: "Text",
        type: "plain",
        tags: [{ title: "Instance" }],
        items: [
          // wrap.
          { title: "Text", type: "plain" },
          { title: "Text", type: "plain" },
          {
            title: "Field",
            type: "field:plain",
            items: [{ title: "", type: "plain" }],
          },
          {
            title: "Field",
            type: "field:plain",
            items: [{ title: "", type: "plain" }],
          },
          {
            title: "Field",
            type: "field:plain",
            items: [{ title: "", type: "plain" }],
          },
        ],
      },
      {
        title: "Text",
        type: "plain",
        tags: [{ title: "Instance" }],
        items: [
          { title: "Text", type: "plain" },
          { title: "Text", type: "plain" },
          {
            title: "Field",
            type: "field:plain",
            items: [{ title: "", type: "plain" }],
          },
          {
            title: "Field",
            type: "field:plain",
            items: [{ title: "", type: "plain" }],
          },
          {
            title: "Field",
            type: "field:plain",
            items: [{ title: "", type: "plain" }],
          },
        ],
      },
    ],
  },
];
