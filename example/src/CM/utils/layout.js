const modelDef = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      default: 'toto',
    },
    email: {
      type: 'email',
    },
    description: {
      type: 'textarea',
      minLength: 20,
    },
    enum: {
      type: 'enumeration', // select,
      enum: ['un', 'deux', 'trois'],
      required: true,
    },
    private: {
      type: 'boolean', // checkbox || switch
    },
    min: {
      type: 'boolean', // checkbox || switch
    },
    max: {
      type: 'boolean', // checkbox || switch
    },
    date: {
      type: 'date',
    },
  },
};

const layout = [
  [
    {
      label: 'Name',
      size: 6,
      disabled: false,
      name: 'name',
      type: 'string',
      description: 'Please set your name',
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      size: 6,
    },
  ],
  [
    {
      name: 'description',
      type: 'textarea',
      size: 8,
      label: ' Dscription',
    },
  ],
  [
    {
      name: 'enum',
      type: 'select',
      size: 6,
      label: 'Enum',
      options: ['un', 'deux', 'trois'],
    },
    {
      type: 'date',
      name: 'date',
      label: 'Date',
      size: 4,
    },
  ],
  [
    {
      name: 'private',
      label: 'Private',
      type: 'checkbox',
      description: 'Private',
      size: 4,
    },
    {
      name: 'max',
      label: 'Max',
      type: 'checkbox',

      size: 4,
    },
    {
      name: 'min',
      label: 'Min',
      type: 'checkbox',
      size: 4,
    },
  ],
];

export { layout, modelDef };
