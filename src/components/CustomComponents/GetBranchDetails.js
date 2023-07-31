import store from "./../Store/index";
const GetBranchDetails = () => {
  const branches = store.getState().branch.branches;
  const branchValues = branches.map((row) => {
    return {
      label: row.branch_name,
    };
  });
  return branchValues;
};

export default GetBranchDetails;
