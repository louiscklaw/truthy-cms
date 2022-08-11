let field_names = [
  'createdAt',
  'updatedAt',
  'uuid',
  'name',
  'email',
  'country',
  'state',
  'address',
  'address1',
  'address2',
  'phone',
  'location',
  'slug',
  'favorite',
  'bookmark',
  'orders',
  'spent',
  'isActive',
];

test = field_name => {
  return `
  <Grid item md={6} xs={12}>
    <TextField
      disabled
      fullWidth
      label={t('RESTAURANT_NAME')}
      name="name"
      required
      value={restaurant_info.${field_name}}
    />
  </Grid>
  `.trim();
};

console.log(field_names.map(field_name => test(field_name)).join('\n'));

console.log(test);
