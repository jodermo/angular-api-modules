import {Injectable} from '@angular/core';
import {Configuration, OpenAIApi} from "openai";

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  public apiKey?: string;
  private options?: any = {
    timeout: 15000,
    headers: {
      "Example-Header": "example",
    },
  };
  private openai?: OpenAIApi;
  private configuration?: Configuration;
  public logResponses = false;
  public useLocalStorage = true;
  public connected = false;
  public completions: any[] = [];
  public errors: any[] = [];
  public model = "text-davinci-003";
  public prompt = "Hello world";
  public engines: any[] = [];


  constructor() {
    this.loadLocalStorage();
  }

  private loadLocalStorage() {
    if (this.useLocalStorage) {
      const model = localStorage.getItem('openai-model');
      this.model = model ? model : this.model;
      const prompt = localStorage.getItem('openai-prompt');
      this.prompt = prompt ? prompt : this.prompt;
      const apiKey = localStorage.getItem('openai-api-key');
      this.apiKey = apiKey ? apiKey : this.apiKey;
    } else {
      localStorage.clear();
    }
  }

  public connect(apiKey = this.apiKey, options = this.options) {
    this.apiKey = apiKey;
    this.options = options;
    console.error('useLocalStorage', this.useLocalStorage);
    if (this.useLocalStorage) {
      if (this.apiKey) {
        localStorage.setItem('openai-api-key', this.apiKey);
      }
    } else {
      localStorage.clear();
    }
    if (this.apiKey) {
      try {
        this.configuration = new Configuration({
          apiKey: this.apiKey,
        });
        this.openai = new OpenAIApi(this.configuration);
        try {
          this.openai.listEngines().then((response: any) => {
            if(this.logResponses){
              console.log('OpenAI listEngines() response', response);
            }
            this.engines = response.data.data ? response.data.data : response.data ? response.data : response;
            this.connected = true;
          }).catch((error: any) => {
            console.error('listEngines error', error);
            this.errors.push({time: Date.now(), error: error});
          });
        } catch (error: any) {
          console.error('OpenAIApi error', error);
          this.errors.push({time: Date.now(), error: error});
        }

      } catch (error: any) {
        this.errors.push({time: Date.now(), error: error});
      }

    }

  }

  public createCompletion(model = this.model, prompt = this.prompt, onSuccess?: (completion: any) => void, onError?: (error: any) => void, options = this.options) {
    this.model = model;
    this.prompt = prompt;
    if (this.useLocalStorage) {
      localStorage.setItem('openai-model', model);
      localStorage.setItem('openai-prompt', prompt);
    } else {
      localStorage.clear();
    }
    if (this.openai) {
      try {
        this.openai.createCompletion({
          model: model,
          prompt: prompt,
        }, options).then((completion) => {
          if(this.logResponses){
            console.log('OpenAI createCompletion() request', model, prompt);
            console.log('OpenAI createCompletion() response', completion);
          }
          this.completions.push((completion.data ? completion.data : completion));
          if (onSuccess) {
            onSuccess(completion);
          }
        }).catch((error: any) => {
          console.error('createCompletion error', error);
          this.errors.push({time: Date.now(), error: error});
          if (onError) {
            onError(error);
          }
        });
      } catch (error: any) {
        console.error('createCompletion error', error);
        this.errors.push({time: Date.now(), error: error});
        if (onError) {
          onError(error);
        }
      }
    }
  }

  timestamp(time: any) {
    return new Date(time).toTimeString();
  }

  parseError(error: any) {
    try {
      error = JSON.parse(error);
    } catch (e) {
      // do nothing
    }
    return error;
  }

  disconnect() {
    this.connected = false;
    localStorage.removeItem('openapi-api-key');
  }

  setModel(model = this.model) {
    this.model = model;
    if (this.useLocalStorage) {
      localStorage.setItem('openai-model', this.model);
    } else {
      localStorage.clear();
    }
  }
}
