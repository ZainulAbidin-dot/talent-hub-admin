import { Box, Card } from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleTestQuery } from "state/api";
import UserCard from "./UserCard";
import { useTheme } from "@emotion/react";
import DetailsCard from "./DetailsCard";
import QuestionCard from "./QuestionCard";
import axios from "axios";

const SingleTest = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleTestQuery(id);
  const theme = useTheme();

  const [commentData, setCommentData] = useState("");

  const modifiedData = data?.data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, commentData);

    await axios
      .post(
        `${localStorage.getItem("baseUrl")}admin/report-tickets/${id}/comments`,
        { text: commentData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res?.data);
        alert("Comment added successfully");
        refetch();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message);
      });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Post" subtitle="Details of Post" />

      <Box
        mt="40px"
        height="80vh"
        display="block"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {modifiedData == null || isLoading ? (
          "Loading..."
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {modifiedData.id ? (
                <DetailsCard
                  key={modifiedData.id}
                  id={modifiedData.id}
                  name={modifiedData.title}
                  skills={modifiedData.skills.join(", ")}
                  startedAt={modifiedData.startedAt}
                  endedAt={modifiedData.endedAt}
                />
              ) : null}

              <Card
                sx={{
                  maxWidth: 545,
                  minWidth: 545,
                  marginTop: "1.5rem",
                  backgroundImage: "none",
                  backgroundColor: theme.palette.background.alt,
                  borderRadius: "0.55rem",
                }}
              >
                {modifiedData?.questions.length > 0
                  ? modifiedData?.questions.map((question, index) => (
                      <QuestionCard
                        key={question.id}
                        sequenceNumber={index + 1}
                        id={question.id}
                        testId={question.testId}
                        question={question.question}
                      />
                    ))
                  : null}
              </Card>

              <Card
                sx={{
                  maxWidth: 545,
                  minWidth: 545,
                  marginTop: "1.5rem",
                  backgroundImage: "none",
                  backgroundColor: theme.palette.background.alt,
                  borderRadius: "0.55rem",
                }}
              >
                {modifiedData.JobseekerTest.length > 0
                  ? modifiedData.JobseekerTest.map((jobseeker, index) => (
                      <UserCard
                        key={jobseeker.id}
                        title={"Job Test Participant - " + (Number(index) + 1)}
                        id={jobseeker.id}
                        jobseekerId={jobseeker.jobseekerId}
                        testId={jobseeker.testId}
                        score={jobseeker.score}
                        status={jobseeker.status}
                        startedAt={jobseeker.startedAt}
                        completedAt={jobseeker.completedAt}
                      />
                    ))
                  : null}
              </Card>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SingleTest;
