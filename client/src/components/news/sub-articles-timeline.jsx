import React, { useState, useEffect } from 'react'

const SubArticlesTimeline = ({subArticles, printSubArticles}) => {
	const [currentPage, setCurrentpage] = useState(0);
	const splitArticleIntoPages = (subArticles, articlesPerPage = 4) => {
		const result = [];
		for (let i = 0; i < subArticles.length; i+= articlesPerPage) {
			result.push(subArticles.slice(i, i + articlesPerPage))
		}
		return result;
	}

	const articlesByPage = splitArticleIntoPages(subArticles);
	
	const displayButtons = () => {
		let buttons = []
		for (let i = 0; i < articlesByPage.length; i++) {
			buttons.push(
				<button className={currentPage === i ? 'current-page' : ''} key={i} onClick={() => setCurrentpage(i)}>
					{i + 1}
				</button>
			)
		}
		return buttons;
	}

	return (
		<>
			<div className='sub-articles'>
				<h1>More News</h1>
				{printSubArticles(articlesByPage[currentPage])}
			</div>
			<p id='page-selector'>
				Page
			</p>
			<div className='news-timeline-page-buttons'>
				{displayButtons()}
			</div>
		</>
	)
}

export default SubArticlesTimeline;