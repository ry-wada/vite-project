import { Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <div>
      <Typography variant="h1" component="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1">
        お探しのページは見つかりませんでした。
      </Typography>
    </div>
  );
};

export default NotFoundPage;
