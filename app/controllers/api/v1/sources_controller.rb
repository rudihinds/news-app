class Api::V1::SourcesController < ApplicationController


    def index
        sources = Source.all
        render json: sources
    end

end
