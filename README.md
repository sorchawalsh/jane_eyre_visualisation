# Jane Eyre visualisation

## Data
The raw data for this project was obtained from the Gutenberg project. It was then processed using Python. The main modules I used included TextBlob (a natural language processing utility) and re, the regular expression module for Python. CSV was also used to write the final file.

Firstly, the book was segmented into chapters, sentences, and words. For these tasks, I used a series of regular expressions. These weren't flawless, however using TextBlob's segmentation utilities did not obtain a better result and was slower. This was the basis for the shape of the graph, with each individual graph representing a chapter, each line a sentence, and its length the number of words in said sentence.

The colour of the lines, as well as the information in the tooltip, was obtained using TextBlob to perform a sentiment analysis. While sentiment analysis is not necessarily a very accurate tool, it can nonetheless give interesting results as we see here.

A key shortcoming of TextBlob's sentiment analysis is the fact that it gives a sentiment score to each word in a segment and then averages it to get the overall score. This leads to certain sentences being more positive than they should be, owing to the weight of negation ending up being slightly low when averaged over long sentences.

## Visualisation
I then used the processed data to create an analysis with three "dimensions": sentences per chapter (x axis), words per sentence (y axis), and sentiment of the sentence (colour). The visualisation of the sentiment analysis shows an overall neutral sentiment, but allows one to clearly see the moments of high emotion. An issue which I was unable to resolve is that certain text bars appear outside the bounds of the graph.
