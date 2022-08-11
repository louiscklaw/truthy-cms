template = test_name => `
helloworld1
helloworld2
helloworld3
${test_name}
`;

input_list = ['name 1', 'name 2', 'name 3'];

console.log(input_list.map(input => template(input)).join('\n'));
