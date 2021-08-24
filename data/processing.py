import csv
import re
from textblob import TextBlob

f = open('jane_eyre_raw.txt', 'r', encoding="utf-8")
g = open('jane_eyre_split.csv', 'w', newline='', encoding="utf-8")
jane_writer = csv.writer(g)
jane_writer.writerow(['chapter','sentence','words','sentiment','most_pos','most_neg'])
jane_eyre = f.read()
jane_eyre_chapters = jane_eyre.split("CHAPTER")
chapter_idx=0
for chapter in jane_eyre_chapters:
    sentences = re.split(r"(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s", chapter)
    max_polarity=0
    min_polarity=0
    most_pos=''
    most_neg=''
    for sentence in sentences:
        blob=TextBlob(sentence)
        polarity=blob.sentiment.polarity
        if polarity > max_polarity:
            most_pos=sentence
            max_polarity=polarity
        if polarity < min_polarity:
            most_neg=sentence
            min_polarity=polarity
        word = re.split(r"(\w[\w']*\w)", sentence)
        jane_writer.writerow([jane_eyre_chapters.index(chapter), sentences.index(sentence), len(word), polarity, '', ''])
    jane_writer.writerow([jane_eyre_chapters.index(chapter), len(sentences), 0, [max_polarity, min_polarity], re.sub('\n', '', most_pos), re.sub('\n', '', most_neg)])
    print("pos", most_pos, chapter_idx)
    print("neg", most_neg, chapter_idx)
    chapter_idx+=1
g.close()
        