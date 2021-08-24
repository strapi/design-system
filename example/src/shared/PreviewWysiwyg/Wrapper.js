import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  font-size: 16px;
  background-color: #fff;
  font-family: 'Lato';
  cursor: text;
  /* border-left: ${({ theme }) => `1px solid ${theme.colors.neutral200}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.neutral200}`}; */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: 10px;
    margin-block-end: 10px;
    font-family: 'Lato';
  }

  h1 {
    font-size: 36px;
    font-weight: 600;
  }

  h2 {
    font-size: 30px;
    font-weight: 500;
  }

  h3 {
    font-size: 24px;
    font-weight: 500;
  }

  h4 {
    font-size: 20px;
    font-weight: 500;
  }

  strong {
    font-weight:800;
  }

  blockquote {
    margin-top: 41px;
    margin-bottom: 34px;
    font-size: 16px;
    font-weight: 400;
    border-left: 5px solid #eee;
    font-style: italic;
    padding: 10px 20px;
  }

  img {
    max-width: 100%;
  }

  table {
    font-size: 13px;
    thead {
      background: rgb(243, 243, 243);
      tr {
        height: 43px;
      }
    }
    tr {
      border: 1px solid #c6cbd1;
    }
    th,
    td {
      padding: 0 25px;
      border: 1px solid #c6cbd1;
      border-bottom: 0;
      border-top: 0;
    }

    tbody {
      tr {
        height: 54px;
      }
    }
  }

  pre,
  code {
    font-size: 13px;
    font-family: 'Lato';
    border-radius: 3px;
    background-color: #002b36;
  }

  /* Inline code */
  p,
  pre,
  td {
    > code {
      color: #839496;
    }
  }

  .warning {
    background-color: #faa684;
    padding: 30px;
    border-radius: 3px;
  }
  .tip {
   
    padding: 30px;
    border-radius: 3px;
  }

  .footnote-ref,
  .footnote-backref {
    color: #007bff;
  }

 
`;

export default Wrapper;
