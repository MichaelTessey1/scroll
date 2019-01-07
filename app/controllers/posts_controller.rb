class PostsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all.includes(:comments)

    render json: @posts.to_json(:include => :comments)
  end

  # GET /posts/1
  def show
    render json: @post.to_json(:include => :comments)
  end

  # POST /posts
  def create
    @user = current_user
    @post = @user.posts.create(post_params)
   # @post.photo.attach(params[:photo])
    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.includes(:comments).find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:photo, :content)
    end
end
