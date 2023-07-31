import store from "./../Store/index";
const GetBranchDetailsWithCode = () => {
  const branches = store.getState().branch.branches;
  const branchValues = branches.map((row) => {
    return {
      label: row.branch_name,
      code: row.branch_code,
    };
  });
  return branchValues;
};

export default GetBranchDetailsWithCode;
