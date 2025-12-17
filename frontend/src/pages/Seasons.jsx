import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PageContainer from "../components/PageContainer";

export default function Seasons() {
  return (
    <PageContainer>
      <Navbar />
      <Header label="Seasons" />
      <div>
        <br></br>
        <h2>Seasons Page</h2>
        <br></br>
        <p>This is the Seasons page content. Not much to see here. </p>
      </div>
    </PageContainer>
  );
}