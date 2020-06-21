import React from "react";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { useStore } from "../../store/store";
import { Redirect } from "react-router-dom";

import { TotalNet, TotalIncome, SavingsAssets } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const getTotalBalance = (savings, prices) => {
  let total = 0;
  for (const saving of savings) {
    total = total + saving.balance * prices[saving.token];
  }
  return total;
};

const getTotalIncome = (savings, prices) => {
  let total = 0;
  for (const saving of savings) {
    total = total + saving.totalInterest * prices[saving.token];
  }
  return total;
};

const Savings = () => {
  const classes = useStyles();
  const store = useStore();
  const { prices, savingAssets } = store.state;

  if (!store.state.web3) {
    return <Redirect to="/sign-in" />;
  } else {
    if (savingAssets) {
      const { deposits } = savingAssets;
      const savings = deposits.savings;
      const totalIncome = getTotalIncome(savings, prices);

      const totalBalance = getTotalBalance(savings, prices);

      return (
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalNet total={totalBalance} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalIncome total={totalIncome} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <SavingsAssets savings={savings} prices={prices} />
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }
  }
};

export default Savings;