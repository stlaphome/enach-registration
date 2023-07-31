import store from "./../Store/index";
const GetBranchArray = () => {
  const branches = store.getState().branch.branches;
  const bran = branches.map((row) => {
    return row.branch_name;
  });
  return bran;
};

export default GetBranchArray;
