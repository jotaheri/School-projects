import streamlit as st
import pandas as pd

st.title("Test application")
st.text("This is a test app")

uploaded_file = st.file_uploader('Upload your file here')

if uploaded_file:
    df = pd.read_csv(uploaded_file)
    st.write(df.describe())
    