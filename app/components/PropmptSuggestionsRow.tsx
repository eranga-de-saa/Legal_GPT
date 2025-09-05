import PromptSuggestionButton from './PromptSuggestionButton';

const propmptSuggestionsRow = ({onPromptClick}) => {

    const prompts = [

'what caution did Hill J give about treating judicial approaches to costs as quasi-statutory rules?',
'why did Sackville J criticize the substitution of “plainly unreasonable” for “unreasonable” when assessing refusal of settlement offers?',
'what caution did Hill J give about treating judicial approaches to costs as quasi-statutory rules?'
    ]
    return (
       <div className="prompt-suggestion-row">
        {prompts.map((prompt, index) => <PromptSuggestionButton 
        key ={`suggestion-${index}`} 
        text={prompt} 
        onClick={() => onPromptClick(prompt)}/>)}
        </div>
    )
}

export default propmptSuggestionsRow;