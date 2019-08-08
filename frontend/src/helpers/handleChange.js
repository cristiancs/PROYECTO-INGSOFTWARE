export default (e, esto, type) => {
  let change = {};
  switch (e.target.type) {
    case "checkbox":
      change[e.target.name] = e.target.checked;
      break;
    case "file":
      change[e.target.name] = e.target.files[0];
      break;
    case "select-one":
    case "radio":
      if (!isNaN(e.target.value)) {
        change[e.target.name] = parseInt(e.target.value, 10);
      } else {
        change[e.target.name] = e.target.value;
      }
      break;

    default:
      if (e.target.value !== "" && !isNaN(e.target.value)) {
        change[e.target.name] = parseInt(e.target.value, 10);
      } else {
        change[e.target.name] = e.target.value;
      }

      break;
  }
  esto.setState({ [type]: { ...esto.state[type], ...change } });
};
