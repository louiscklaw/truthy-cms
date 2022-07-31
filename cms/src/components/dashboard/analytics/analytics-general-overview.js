import { Grid } from "@mui/material";
import { CardTest1 } from "./card-test-1";
import { CardTest2 } from "./card-test-2";
import { CardTest3 } from "./card-test-3";
import { CardTest4 } from "./card-test-4";

export const AnalyticsGeneralOverview = () => (
  <Grid container spacing={4}>
    <Grid item md={3} sm={6} xs={12}>
      <CardTest2 />
    </Grid>
    <Grid item md={3} sm={6} xs={12}>
      <CardTest1 />
    </Grid>
    <Grid item md={3} sm={6} xs={12}>
      <CardTest3 />
    </Grid>
    <Grid item md={3} sm={6} xs={12}>
      <CardTest4 />
    </Grid>
  </Grid>
);
