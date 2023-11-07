"""Initial migration

Revision ID: c8f10dd23ced
Revises: 
Create Date: 2023-11-07 10:41:26.481209

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8f10dd23ced'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=False),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.CheckConstraint('length(password_hash) >= 8', name='password_length_check'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_users_username'), ['username'], unique=True)

    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('club', sa.String(length=64), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_favorites_user_id'), ['user_id'], unique=False)

    op.create_table('notifications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('recipient_id', sa.Integer(), nullable=False),
    sa.Column('target_id', sa.Integer(), nullable=False),
    sa.Column('target_type', sa.Enum('POST_LIKE', 'POST_COMMENT', 'COMMENT_LIKE', name='notificationtype'), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('read', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['recipient_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=200), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_posts_id'), ['id'], unique=False)
        batch_op.create_index(batch_op.f('ix_posts_user_id'), ['user_id'], unique=False)

    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_comments_id'), ['id'], unique=False)
        batch_op.create_index(batch_op.f('ix_comments_post_id'), ['post_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_comments_user_id'), ['user_id'], unique=False)

    op.create_table('post_likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('post_likes', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_post_likes_id'), ['id'], unique=False)
        batch_op.create_index(batch_op.f('ix_post_likes_post_id'), ['post_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_post_likes_user_id'), ['user_id'], unique=False)

    op.create_table('reposts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment_likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('comment_likes', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_comment_likes_comment_id'), ['comment_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_comment_likes_id'), ['id'], unique=False)
        batch_op.create_index(batch_op.f('ix_comment_likes_user_id'), ['user_id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comment_likes', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_comment_likes_user_id'))
        batch_op.drop_index(batch_op.f('ix_comment_likes_id'))
        batch_op.drop_index(batch_op.f('ix_comment_likes_comment_id'))

    op.drop_table('comment_likes')
    op.drop_table('reposts')
    with op.batch_alter_table('post_likes', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_post_likes_user_id'))
        batch_op.drop_index(batch_op.f('ix_post_likes_post_id'))
        batch_op.drop_index(batch_op.f('ix_post_likes_id'))

    op.drop_table('post_likes')
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_comments_user_id'))
        batch_op.drop_index(batch_op.f('ix_comments_post_id'))
        batch_op.drop_index(batch_op.f('ix_comments_id'))

    op.drop_table('comments')
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_user_id'))
        batch_op.drop_index(batch_op.f('ix_posts_id'))

    op.drop_table('posts')
    op.drop_table('notifications')
    with op.batch_alter_table('favorites', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_favorites_user_id'))

    op.drop_table('favorites')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_users_username'))

    op.drop_table('users')
    # ### end Alembic commands ###