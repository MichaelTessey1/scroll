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
    # render json: url_for(@post.photo)
    render json: @post.as_json(:include => :comments)
  end

  # POST /posts
  def create
    @user = current_user
    @post = @user.posts.create(post_params)
    @post.photo.attach(io: photo_io, filename: params[:name])
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
      params.require(:post).permit(:user_id, :data, :name, :content)
    end

    def photo_io
      photo = Base64.decode64(params[:data])
      StringIO.new(photo)
    end
end
